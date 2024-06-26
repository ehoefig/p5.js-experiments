/* 
 * p5.js sketch based on foundation.
 * A generative daisy
 *
 * Created by Edzard Höfig in 2024
 * Licensed under CC BY 4.0
 */


const SKETCH_NAME = "daisy - paint a daisy"
const SKETCH_VERSION = "0.2"

const center_radius = 50
const center_edge = 10
const dot_radius = 5
const dot_pertubation = 0.05
const petal_length = 180
const petal_width = 40
const petal_pertubation = 0.05
const num_petals = 20;
const shadow_offset = 2


function init() {
	createCanvas(windowWidth, windowHeight)

	console.group(`Daisy specific Information`)
	console.info(`center radius is ${center_radius}`)
	console.info(`center edge is ${center_edge}`)
	console.info(`dot radius is ${dot_radius}`)
	console.info(`dot pertubation is ${dot_pertubation}`)
	console.info(`petal length is ${petal_length}`)
	console.info(`petal width is ${petal_width}`)
	console.info(`petal pertubation is ${petal_pertubation}`)
	console.info(`number of petals is ${num_petals}`)
	console.info(`shadow offset is ${shadow_offset}`)
	console.groupEnd()
}

function resize() {

}

function update() {


}

function draw_center_background() {
	let c = center_radius * 2 + center_edge
	fill(0, 255, 0, 100)
	ellipse(0, 0, c, c)

	c -= center_edge
	fill(0,255,0)
	ellipse(0, 0, c, c)

	c -= center_edge
	fill(200, 255, 0)
	ellipse(0, 0, c, c)

	c -= center_edge
	fill(255,255,0)
	ellipse(0, 0, c, c)
	
}

function draw_dot(circle, angle) {

	push()
	translate(shadow_offset, shadow_offset)
	rotate(angle)
	translate(circle * dot_radius * 2, 0);
	fill(0, 50)
	ellipse(0, 0, dot_radius * 2, dot_radius * 2)
	pop()

	push()
	rotate(angle)
	translate(circle * dot_radius * 2, 0);
	fill(255, 255, 0)
	ellipse(0, 0, dot_radius * 2, dot_radius * 2)
	pop()
}

function draw_center() {

	// Draw the dots
	const num_circles = Math.floor(center_radius / (dot_radius*2))
	for (let n_circle = num_circles; n_circle > 0; --n_circle) {
		const circumference = 2 * PI * n_circle * dot_radius * 2
		const num_dots = Math.floor(circumference / (dot_radius*2))
		const angle = TWO_PI / num_dots
		for (let n_dot = 0; n_dot < num_dots; ++n_dot) {
			draw_dot(n_circle, n_dot * angle + random(-dot_pertubation, dot_pertubation))
		}
	}
	// Draw center dot
	draw_dot(0, 0)
}

function draw_petal(angle) {

	push()
	translate(shadow_offset, shadow_offset)
	rotate(angle)
	translate(center_radius + petal_length / 2, 0)
	fill(0, 50)
	ellipse(0, 0, petal_length + shadow_offset, petal_width + shadow_offset)
	pop()

	push()
	rotate(angle)
	translate(center_radius + petal_length / 2, 0)
	fill(255)
	ellipse(0, 0, petal_length, petal_width)
	pop()
}

function paint() {

	background(50, 50, 100)

	// Using centric coordinates
	translate(width / 2, height / 2)

	noStroke()

	draw_center_background()

	// Calculate petals
	let petals = []
	const angle = TWO_PI / num_petals
	for (let n = 0; n < num_petals; ++n) {
		petals.push(n * angle + random(-petal_pertubation, petal_pertubation))
	}

	// randomize petals order
	// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	// TODO: how does a real daisy do it?
	let shuffled_petals = petals
		.map(value => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)

	// Draw petals 
	for (let n = 0; n < num_petals; ++n) {
		draw_petal(shuffled_petals[n])
	}

	draw_center()

	noLoop()
}
