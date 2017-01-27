import { ParkingSystemPage } from './app.po';

describe('parking-system App', function() {
  let page: ParkingSystemPage;

  beforeEach(() => {
    page = new ParkingSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
