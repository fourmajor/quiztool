import { QuiztoolPage } from './app.po';

describe('quiztool App', () => {
  let page: QuiztoolPage;

  beforeEach(() => {
    page = new QuiztoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
