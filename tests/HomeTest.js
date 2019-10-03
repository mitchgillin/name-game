import { BasePage } from "../pages/BasePage";
import {Selector} from "testcafe";

const page = new BasePage();

fixture`Home`.page(page.baseUrl);

test('Correct title displays', async t => {
    await t
        .expect(page.title.textContent)
        .eql("name game")
});

test('Correctly iterates attempts', async t => {
    const photo = await page.firstPhoto;
    const initialValue = Number(await page.attempts.textValue);
    await t.click(photo);
    const finalValue =  Number(await page.attempts.textValue);
    await t.expect(finalValue).eql(initialValue + 1);
})

test('Correctly iterates correct answers', async t => {
    const correctName = await page.correctName.innerText;
    const correctPhoto = await page.selectPageElement(correctName)
    const initialAttempts = Number(await page.attempts.textValue);
    const initialCorrect = Number(await page.correct.textValue);

    await t.click(correctPhoto.parent());

    const finalCorrect = Number(await page.correct.textValue);
    const finalAttempts =  Number(await page.attempts.textValue);


    await t.expect(initialCorrect + initialAttempts + 1).eql(finalCorrect + finalAttempts);
})

test('Correctly resets streak on incorrect answer', async t => {
    const correctAnswer = await page.correctName.innerText;
    const incorrectPhoto = await page.selectIncorrectPhoto(correctAnswer).nth(0);
    const initialAttempts = Number(await page.attempts.textValue);
    const initialCorrect = Number(await page.correct.textValue);

    await t.click(incorrectPhoto.parent());

    const finalCorrect = Number(await page.correct.textValue);
    const finalAttempts =  Number(await page.attempts.textValue);
    const finalStreak = Number(await page.streak.innerText);

    await t.expect(initialAttempts + 1).eql(finalAttempts)
           .expect(initialCorrect).eql(finalCorrect)
           .expect(finalStreak).eql(0)
})
