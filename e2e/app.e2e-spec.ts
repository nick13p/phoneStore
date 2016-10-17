import { AoePage } from './app.po';

describe('aoe App', function() {
  let page: AoePage;

  beforeEach(() => {
    page = new AoePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
