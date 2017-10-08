import { TimeComponentsPage } from './app.po';

describe('time-components App', () => {
  let page: TimeComponentsPage;

  beforeEach(() => {
    page = new TimeComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
