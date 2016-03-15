defmodule Courier.Web.Serializers.Contact do
  use JaSerializer

  alias Courier.Web.Serializers.Message

  attributes [:name, :email]

  # has_many :messages,
    # serializer: Message,
    # include: false,
    # field: :message_id,
    # type: :message

  def id(%{contact: {_name, email}}, _conn), do: email
  def id(%{contact: email}, _conn), do: email

  def name(%{contact: {name, _email}}, _conn), do: name
  def name(%{contact: _email}, _conn), do: nil

  def email(%{contact: {_name, email}}, _conn), do: email
  def email(%{contact: email}, _conn), do: email
end
