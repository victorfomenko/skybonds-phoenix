import {expect, assert} from 'chai';
import DateDayCaster from '../src/data/casters/DateDayCaster';


describe('Casters Suite', function () {
  it('DateDay caster', async () => {
    expect(DateDayCaster.cast('20140714').getTime()).to.equal(new Date('Mon, 14 Jul 2014 00:00:00 GMT').getTime());
  });
  it('DateDay formatter', async () => {
    expect(DateDayCaster.format(new Date('Mon, 14 Jul 2014 00:00:00 GMT'))).to.equal('20140714');
  });
});
