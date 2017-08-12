#ifdef GL_ES
precision mediump float;
#endif

// Bell-shaped curve with maximum value 1.0
float bell(float x, float center, float stretch) {
    return exp(-pow((x - center) / stretch, 2.0));
}

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_frequency;

float circle(in vec2 _st, in float _radius){
    float aspect_ratio = u_resolution.x / u_resolution.y;
    vec2 dist = _st-vec2(0.5, 0.5);
    return 1.-smoothstep(_radius-(_radius*0.8),
                         _radius+(_radius*0.8),
                         dot(dist,dist)*4.0);
}

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    gl_FragColor.r = circle(st,0.3 + sin(u_time * 3.1415 * u_frequency) / 5.0);
    gl_FragColor.a = 1.0;
    
    /*
    //Center the origin
    uv -= 0.5; 
    
    //Fix aspect ratio
    float aspect_ratio = u_resolution.x / u_resolution.y;
    uv.x *= aspect_ratio;
    
    //Distance from center
    float dist_center = length(uv);
    
    // Iterate over the color components
    for (int i = 0; i < 1; i++) {
        //Each
        float phase_shift = float(i) * 0.13;
        
        //wrap the time value to a range [0.0, 1.5]
        //this is slightly greater than size of the window
        //so it makes the animation smoother. This will be
        //used for the radius of animated pulses
        float pulse_radius = sin((u_time + phase_shift) * 3.14159265 * u_frequency) / 5.0;
    
        //how much to stretch the pulse (which takes the form of a bell-shaped
        //curve with respect to distance from center.
        float pulse_stretch = 0.3;
     
        //Make a bell curve pulsing outwards from the center of the screen.
        gl_FragColor[i] = bell(dist_center, pulse_radius, pulse_stretch);
    }
    gl_FragColor.a = 1.0;
    */
}