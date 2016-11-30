import { Sc68FrontendPage } from './app.po';

describe('sc68-frontend App', function() {
  let page: Sc68FrontendPage;

  beforeEach(() => {
    page = new Sc68FrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
