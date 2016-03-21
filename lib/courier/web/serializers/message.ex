defmodule Courier.Web.Serializers.Message do
  use JaSerializer
  alias JaSerializer.Formatter.Utils
  alias Courier.Web.Serializers.Account

  attributes [:headers, :body, :parts, :raw]

  has_one :from,
    serializer: Account,
    include: true,
    field: :from,
    type: :account

  has_many :recipients,
    serializer: Account,
    include: true,
    field: :recipients,
    type: :account

  def body(%Mail.Message{} = message, _conn) do
    Mail.Encoder.encode(message.body, get_in(message.headers, [:content_transfer_encoding]))
  end

  def id(%Mail.Message{} = message, _conn),
    do: Mail.Message.get_header(message, :id)

  def headers(%Mail.Message{} = message, _conn) do
    message
    |> Mail.Message.delete_header(:id)
    |> Mail.Message.delete_header(:from)
    |> Mail.Message.delete_header(:to)
    |> Mail.Message.delete_header(:cc)
    |> Mail.Message.delete_header(:bcc)
    |> Map.get(:headers)
    |> Enum.into(%{}, fn({key, value}) -> {Utils.format_key(key), format_value(key, value)} end)
  end

  def parts(%Mail.Message{parts: []}, _conn), do: nil
  def parts(%Mail.Message{} = message, _conn) do
    message.parts
    |> Enum.map(fn(part) ->
      __MODULE__.format(part, %{})
      |> get_in([:data, :attributes])
    end)
  end

  def from(%Mail.Message{} = message, _conn) do
    %{account: Mail.Message.get_header(message, :from), message_id: [message_id(message)]}
  end

  def raw(%Mail.Message{} = message, _conn) do
    message
    |> Mail.Message.delete_header(:id)
    |> Mail.Renderers.RFC2822.render()
  end

  def recipients(%Mail.Message{} = message, _conn) do
    Mail.all_recipients(message)
    |> Enum.map(&(%{account: &1, message_id: [message_id(message)]}))
  end

  defp message_id(%Mail.Message{} = message), do: Mail.Message.get_header(message, :id)

  defp format_value(:date, datetime),
    do: Mail.Renderers.RFC2822.timestamp_from_erl(datetime)
  defp format_value(key, list) when is_list(list) do
    list
    |> Keyword.to_list()
    |> Enum.map(fn
      value when is_tuple(value) ->
        value
        |> Tuple.to_list()
        |> Enum.map(&format_value(key, &1))
      value -> format_value(key, value)
    end)
  end
  defp format_value(_key, value) when is_atom(value) do
    value
    |> Atom.to_string()
    |> Utils.format_key()
  end
  defp format_value(_key, value), do: value
end
