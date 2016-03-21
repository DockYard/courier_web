defmodule ClientTestServer do
  use Plug.Router
  require Logger

  plug Plug.Logger
  plug :match
  plug :dispatch

  def start(_type, _args) do
    Courier.Adapters.Web.init([])
    {:ok, _} = Plug.Adapters.Cowboy.http __MODULE__, []
  end

  get "/test-start" do
    Courier.Adapters.Web.clear()

    Mail.build_multipart()
    |> Mail.put_to({"User", "to@example.com"})
    |> Mail.put_from({"Application", "from@example.com"})
    |> Mail.put_subject("Welcome aboard!")
    |> Mail.put_text("Thank you for sigining up.")
    |> Mail.put_html("<span>Thank you for signing up.</span>")
    |> Courier.Adapters.Web.deliver([])

    conn
    |> send_resp(200, "ok")
    |> halt()
  end

  forward "/", to: Courier.Web.Endpoint
end
