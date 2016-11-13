defmodule Courier.Web.Serializers.Account do
  use JaSerializer

  attributes [:name, :email]

  def id(%{account: {_name, email}}, _conn), do: email
  def id(%{account: email}, _conn), do: email

  def name(%{account: {name, _email}}, _conn), do: name
  def name(%{account: _email}, _conn), do: nil

  def email(%{account: {_name, email}}, _conn), do: email
  def email(%{account: email}, _conn), do: email
end
