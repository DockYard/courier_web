defmodule Courier.Adapters.WebTest do
  use ExUnit.Case

  @adapter Courier.Adapters.Web

  setup do
    {:ok, pid} =
      [Supervisor.Spec.supervisor(@adapter, [[]])]
      |> Supervisor.start_link(strategy: :one_for_one)

    {:ok, pid: pid}
  end

  @message1 Mail.build()
            |> Mail.put_subject("Let's go up the hill!")
            |> Mail.put_to("jack@example.com")
            |> Mail.put_from("jill@example.com")
            |> Mail.put_text("To fetch a pail of water")

  @message2 Mail.build()
            |> Mail.put_subject("Let's go down the hill!")
            |> Mail.put_to("jill@example.com")
            |> Mail.put_from("jack@example.com")
            |> Mail.put_text("To fetch a pail of water")

  @message3 Mail.build()
            |> Mail.put_subject("Let's Dance!")
            |> Mail.put_to([{"Jack", "jack@example.com"}, "spider@example.com"])
            |> Mail.put_from("jill@example.com")
            |> Mail.put_text("To annoy the adults!")

  test "will store messages in ets when delivered" do
    assert Courier.Adapters.Web.messages() == []

    Courier.Adapters.Web.deliver(@message1, %{})
    Courier.Adapters.Web.deliver(@message2, %{})

    messages =
      Courier.Adapters.Web.messages()
      |> clear_ids()

    assert Enum.member?(messages, @message1)
    assert Enum.member?(messages, @message2)
  end

  test "find all unique recipients" do
    assert Courier.Adapters.Web.recipients == []

    Courier.Adapters.Web.deliver(@message1, %{})
    Courier.Adapters.Web.deliver(@message2, %{})
    Courier.Adapters.Web.deliver(@message3, %{})

    assert length(Courier.Adapters.Web.recipients()) == 3
    assert Enum.member?(Courier.Adapters.Web.recipients(), "jack@example.com")
    assert Enum.member?(Courier.Adapters.Web.recipients(), "jill@example.com")
    assert Enum.member?(Courier.Adapters.Web.recipients(), "spider@example.com")
  end

  test "find all messages by recipient" do
    Courier.Adapters.Web.deliver(@message1, %{})
    Courier.Adapters.Web.deliver(@message2, %{})
    Courier.Adapters.Web.deliver(@message3, %{})

    messages =
      Courier.Adapters.Web.messages_for("jack@example.com")
      |> clear_ids()

    assert Enum.member?(messages, @message1)
    refute Enum.member?(messages, @message2)
    assert Enum.member?(messages, @message3)
  end

  test "clean all emails" do
    Courier.Adapters.Web.deliver(@message1, %{})
    Courier.Adapters.Web.deliver(@message2, %{})

    assert length(Courier.Adapters.Web.messages()) == 2

    Courier.Adapters.Web.clear()

    assert length(Courier.Adapters.Web.messages()) == 0
  end

  test "deleting an email" do
    Courier.Adapters.Web.deliver(@message1, %{})
    Courier.Adapters.Web.deliver(@message2, %{})

    assert length(Courier.Adapters.Web.messages()) == 2

    messages = Courier.Adapters.Web.messages()

    messages
    |> List.last()
    |> Courier.Adapters.Web.delete()

    messages =
      Courier.Adapters.Web.messages()
      |> clear_ids()

    assert length(messages) == 1
    assert messages == [@message2]
  end

  defp clear_ids([]), do: []
  defp clear_ids([message | messages]) do
    [Mail.Message.delete_header(message, :id) | clear_ids(messages)]
  end
end

