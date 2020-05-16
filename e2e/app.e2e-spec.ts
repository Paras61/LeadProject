import { CjAppPage } from './app.po';

describe('cj-app App', function() {
  let page: CjAppPage;

  beforeEach(() => {
    page = new CjAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
