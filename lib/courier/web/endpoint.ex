defmodule Courier.Web.Endpoint do
  use Plug.Router

  alias Courier.{Adapters.Web, Web.Serializers.Message}

  plug :match
  plug :dispatch

  get "/messages" do
    data =
      Web.messages()
      |> Message.format(conn)
      |> Poison.encode!()

    send_resp(conn, 200, data)
  end

  delete "/messages/:id" do
    find_message(id)
    |> case do
      nil -> send_resp(conn, 404, "")
      message ->
        Web.delete(message)
        send_resp(conn, 204, "")
    end
  end

  defp find_message(id) do
    Web.messages()
    |> Enum.find(fn(message) ->
      stringify_id(Mail.Message.get_header(message, :id)) == stringify_id(id)
    end)
  end

  defp stringify_id(id) when is_binary(id), do: id
  defp stringify_id(id) when is_integer(id), do: Integer.to_string(id)
end
