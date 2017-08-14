# Find the Spot

Simplistic location based game to find to a location using simulated radio location.

I made this as a part of a treasure hunt for my kid's birthday party. It's not fancy, it's not advanced, but the kids enjoyed it, and it's also a fun example of geolocation, WebGL and Web Audio working together.

You can try out the [live demo](https://birthday.liedman.net/2017/) that we used at the party.

## Running

Clone this repo, then install dependencies:

```shell
npm install
```

To run locally / develop:

```shell
npm start
```

Then go to `http://localhost:8080/`.


To build the site to deploy somewhere:

```shell
npm run build
```

Please note that you have to deploy on a host with `https` if you plan on running this from Chrome (otherwise geolocation will not work); [Let's encrypt](https://letsencrypt.org/) is a great way to add this for free.

## Playing

The app plays a tone and pulses a light on the screen depending on your distance to the target location. The tone's frequency becomes higher the close you are to your target, as well as the light pulsating faster when close.

The target location is stored in your browser's local storage, so the target is set per client, not centralized.

To place the target coordinate, enter the "admin mode" by tapping the screen _quickly_ (less than a half second) four times: you will see a map with a marker that denotes the target location. Drag the marker to the target you like. Your own location is marked by a small, blue circle in the map.

Exit admin mode by quickly tapping the screen four times again.

## Code

Yeah, sorry about the code :) As already mentioned, this isn't fancy, and I made this as a "one-off" example, so the code is far from clean.
