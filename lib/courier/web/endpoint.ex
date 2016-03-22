defmodule Courier.Web.Endpoint do
  use Plug.Router

  alias Courier.{Adapters.Web, Web.Serializers.Message}

  plug Plug.Static, at: "/", from: :courier_web
  plug :match
  plug :dispatch

  get "/" do
    base =
      conn.script_name
      |> Enum.join("/")

    body =
      Path.join([Application.app_dir(:courier_web), "priv/static", "index.html"])
      |> File.read!()
      |> String.replace(~s(<base href="/" />), ~s(<base href="/#{base}/" />))

    send_resp(conn, 200, body)
  end

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

  get "/*path" do
    base =
      conn.script_name
      |> Enum.join("/")

    body =
      Path.join([Application.app_dir(:courier_web), "priv/static", "index.html"])
      |> File.read!()
      |> String.replace(~s(<base href="/" />), ~s(<base href="/#{base}/" />))

    send_resp(conn, 200, body)
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
