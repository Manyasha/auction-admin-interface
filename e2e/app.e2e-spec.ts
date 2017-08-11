import { TheatreAdminInterfacePage } from './app.po';

describe('theatre-admin-interface App', () => {
  let page: TheatreAdminInterfacePage;

  beforeEach(() => {
    page = new TheatreAdminInterfacePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
