import { GracePage } from './app.po';

describe('grace App', function() {
  let page: GracePage;

  beforeEach(() => {
    page = new GracePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
