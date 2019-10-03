import { Selector } from "testcafe";

export class BasePage {

    selectPageElement (elementName) {
        return Selector('.name')
            .withText(elementName);
    }

    selectIncorrectPhoto(correctName) {
        return Selector('.name').filter((node, idx) => {
            return node.innerText != correctName;
        }, { correctName });

    }

    baseUrl = 'http://www.ericrochester.com/name-game/';

    title = Selector(".header")
    firstPhoto = Selector(".photo")
    correctName=Selector('#name');
    attempts = Selector(".attempts")
    correct = Selector(".correct")
    streak = Selector(".streak")

}
