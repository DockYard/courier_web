defmodule CourierWeb.Mixfile do
  use Mix.Project

  def project do
    [app: :courier_web,
     version: "0.0.8",
     elixir: "~> 1.2",
     elixirc_paths: elixirc_paths(),
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     description: description(),
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [applications: [:logger]]
  end

  defp elixirc_paths(), do: ["lib", "priv"]

  def description do
    "Web client adapter for Courier"
  end

  def package do
    [maintainers: ["Brian Cardarella"],
     licenses: ["MIT"],
     links: %{"GitHub" => "https://github.com/DockYard/courier_web"}
     ]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [{:courier, "~> 0.0.2"},
     {:uuid, "> 0.0.0"},
     {:plug, "> 0.0.0"},
     {:ja_serializer, "> 0.0.0"},
     {:poison, "> 0.0.0"}
     ]
  end
end
