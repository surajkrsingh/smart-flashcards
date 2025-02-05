import { gsap } from 'gsap';

export const animateFlip = (element, direction, isForward = true) => {
    const rotateAxis = direction === 'horizontal' ? 'rotateY' : 'rotateX';
    const startAngle = isForward ? 0 : 180;
    const endAngle = isForward ? -180 : 0;

    return gsap.to(element, {
        duration: 0.6,
        [rotateAxis]: endAngle,
        ease: 'power2.inOut'
    });
};

export const animateSlide = (element, direction, isForward = true) => {
    const axis = direction === 'horizontal' ? 'x' : 'y';
    const distance = isForward ? '-100%' : '100%';

    return gsap.to(element, {
        duration: 0.5,
        [axis]: distance,
        ease: 'power2.inOut'
    });
};

export const animateStack = (elements, spacing, isForward = true) => {
    const timeline = gsap.timeline();
    
    elements.forEach((element, index) => {
        timeline.to(element, {
            duration: 0.3,
            y: index * spacing,
            z: -index * 2,
            ease: 'power2.out'
        }, index * 0.1);
    });

    return timeline;
}; 