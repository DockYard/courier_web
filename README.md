# CourierWeb

Web Adapter, Endpoint, and Client application for Courier.

[![Build Status](https://secure.travis-ci.org/DockYard/elixir-courier_web.svg?branch=master)](http://travis-ci.org/DockYard/elixir-courier_web)

## How to use:

In your environment's config you'll need to set the CourierWeber's adapter to `Courier.Adapter.Web`

```elixir
config :my_app, MyApp.CourierWeber,
  adapter: Courier.Adapters.Web
```

Now in your router you'll need to mount the endpoint:

```elixir
# for a regular Plug Router
forward "/courier_web", to: Courier.Web.Endpoint

# for a Phoenix Router
forward "/courier_web", Courier.Web.Endpoint
```

The path of `/courier_web` is just a suggestion, you can mount the application at any path.

Finally when you are ready simply point your browser to the mount point and you'll see the
client app!

![](http://i.imgur.com/2TfNckf.gif)

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/elixir-courier_web/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Looking for help with your Elixir project? ##

[At DockYard we are ready to help you build your next Elixir project](https://dockyard.com/phoenix-consulting). We have a unique expertise 
in Elixir and Phoenix development that is unmatched. [Get in touch!](https://dockyard.com/contact/hire-us)

At DockYard we love Elixir! You can [read our Elixir blog posts](https://dockyard.com/blog/categories/elixir)
or come visit us at [The Boston Elixir Meetup](http://www.meetup.com/Boston-Elixir/) that we organize.

## Want to help? ##

Please do! We are always looking to improve this library. Please see our
[Contribution Guidelines](https://github.com/dockyard/elixir-courier_web/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com/), Inc. &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
