defmodule Courier.Web.EndpointTest do
  use ExUnit.Case, async: true
  use Plug.Test

  alias Courier.{Adapters.Web, Web.Endpoint}
  @adapter Web

  setup do
    {:ok, pid} =
      [Supervisor.Spec.supervisor(@adapter, [[]])]
      |> Supervisor.start_link(strategy: :one_for_one)

    {:ok, pid: pid}
  end

  @message1 Mail.build()
            |> Mail.put_subject("Test")
            |> Mail.put_to({"To", "to@example.com"})
            |> Mail.put_from("from@example.com")
            |> Mail.put_text("This is only a test")

  @message2 Mail.build()
            |> Mail.put_subject("Other Test")
            |> Mail.put_to("to@example.com")
            |> Mail.put_from({"From", "from@example.com"})
            |> Mail.put_text("This is only a test")

  test "returns an empty array when no messages available" do
    conn =
      conn(:get, "/messages")
      |> Endpoint.call([])

    expected = %{
      jsonapi: %{version: "1.0"},
      data: []
    }

    assert conn.state == :sent
    assert conn.status == 200
    assert conn.resp_body == Poison.encode!(expected)
  end

  test "returns all messages as json when messages are available" do
    Web.deliver(@message1, [])
    Web.deliver(@message2, [])

    conn =
      conn(:get, "/messages")
      |> Endpoint.call([])

    assert conn.state == :sent
    assert conn.status == 200

    _response =
      conn.resp_body
      |> Poison.decode!()
  end

  test "deletes a message when available" do
    Web.deliver(@message1, [])

    [message] = Web.messages()

    conn =
      conn(:delete, "/messages/#{Mail.Message.get_header(message, :id)}")
      |> Endpoint.call([])

    assert conn.state == :sent
    assert conn.status == 204

    assert Web.messages() |> length() == 0
  end
end
