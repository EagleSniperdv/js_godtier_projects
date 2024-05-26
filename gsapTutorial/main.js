// gsap.to(".logo", {
//     duration: 2,
//     x: 300,
//     backgroundColor: "#560563",
//     borderRadius: "20%",
//     border: "5px solid white"
// });

// gsap.set(".logo, .astronaut", {
//     transformOrigin: "50% 50%"
// });
// gsap.to(".logo, .astronaut", {
//     duration: 2,
//     rotation: 360
// });

gsap.from(".logo, .astronaut",{
    duration: 1.5,
    opacity: 0,
    scale: 0.3,
    ease: "back",
    stagger: 0.25,
    x: 300,
    rotate:720
});

gsap.to(".logo, .astronaut",{
    duration: 1.5,
    opacity: 0,
    scale: 0.3,
    ease: "back",
    stagger: 0.25,
    x: 300,
    rotate:720,
    delay: 1.5
});
