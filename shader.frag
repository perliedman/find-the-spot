#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_frequency;

float circle(in vec2 _st, in float _radius, in float _v){
    float aspect_ratio = u_resolution.x / u_resolution.y;
    vec2 dist = _st-vec2(0.5*aspect_ratio, 0.5);
    return 1.-smoothstep(_radius-(_radius*_v),
                         _radius+(_radius*_v),
                         dot(dist,dist)*4.0);
}

void main()
{
    float aspect_ratio = u_resolution.x / u_resolution.y;
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= aspect_ratio;

    float amount = 0.0;
    
    amount = (1.0 + sin(u_time*6.0)) * 0.3;
    amount *= 1.0 + sin(u_time*16.0) * 0.3;
    amount *= 1.0 + sin(u_time*19.0) * 0.3;
    amount *= 1.0 + sin(u_time*27.0) * 0.3;
    amount = pow(amount, 3.0);

    amount *= 0.05;
 
    float pulse = sin(u_time * 3.1415 * u_frequency) / 4.0 + 0.35;

    st.y -= amount * 0.5;
    gl_FragColor.r = circle(st, 0.2, pulse);
    st.x += amount;
    gl_FragColor.g = circle(st, 0.2, pulse)*0.3;
    st.x -= 2.0 * amount;
    gl_FragColor.b = circle(st, 0.2, pulse)*0.3;
    gl_FragColor.a = 1.0;    
}