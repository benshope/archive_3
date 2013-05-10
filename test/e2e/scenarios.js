'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/home");
  });


  describe('home', function() {

    beforeEach(function() {
      browser().navigateTo('#/home');
    });


    it('should render home when user navigates to /home', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 1/);
    });

  });


  describe('about', function() {

    beforeEach(function() {
      browser().navigateTo('#/about');
    });


    it('should render about when user navigates to /about', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/partial for view 2/);
    });

  });
});
