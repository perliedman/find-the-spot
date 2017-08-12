#ifdef GL_ES
precision mediump float;
#endif

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
}