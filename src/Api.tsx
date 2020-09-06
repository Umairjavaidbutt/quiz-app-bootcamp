import {Util} from './Util'

export type Quiz = {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type Question = Quiz & {answers : string[]}

export enum Difficulty {
    Easy = 'easy',
    Medium = 'medium',
    Hard = 'hard'
}

export enum Choice {
    MC = 'multiple',
    TF = 'True / False'
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty, type: Choice) => {
    const link = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`
    const data = await (await fetch(link)).json()
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: Util([question.correct_answer, ...question.incorrect_answers])
        }
    ) 
    )
}