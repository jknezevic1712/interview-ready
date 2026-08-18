export class QuizSessionNotFoundException extends Error {
	constructor(id: string) {
		super(`Quiz session ${id} was not found`);
		this.name = 'QuizSessionNotFoundException';
	}
}
