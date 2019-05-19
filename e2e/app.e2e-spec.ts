import { EcomPage } from './app.po';

describe('ecom App', () => {
  let page: EcomPage;

  beforeEach(() => {
    page = new EcomPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
