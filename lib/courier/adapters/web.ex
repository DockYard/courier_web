defmodule Courier.Adapters.Web do
  use Courier.Adapters.Agent

  @doc """
  Delivers the email to the agent

  Before delivery a UUID is injected into the message header's `id` field. After
  which it delegates delivery to `Courier.Adapters.Agent.delivery/2`
  """
  def deliver(%Mail.Message{} = message, opts) do
    message
    |> Mail.Message.put_header(:id, UUID.uuid1())
    |> super(opts)
  end
end
