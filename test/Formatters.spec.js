import {expect, assert} from 'chai';
import DateFormatter from '../src/helpers/formatters/DateFormatter';
import NumberFormatter from '../src/helpers/formatters/NumberFormatter';

describe('Formatters Suite', function () {
  it('Date formatter', async () => {
    let date = 'Wed Dec 31 2017 10:00:00 GMT+0000';

    expect(
      DateFormatter(new Date(date))
    ).to.equal('31.12.2017');

    expect(
      DateFormatter(new Date(date), { regexp: '$3/$2/$1'})
    ).to.equal('2017/12/31');

    expect(
      DateFormatter(new Date(date), { regexp: '$1/$2/$3'})
    ).to.equal('31/12/2017');

    expect(
      DateFormatter(null)
    ).to.equal('');

    expect(
      DateFormatter(new Date(''))
    ).to.equal('');

    expect(
      DateFormatter(new Date(undefined), { placeholder: 'NA' })
    ).to.equal('NA');
  });

  it('Number formatter', async () => {
    expect(
      NumberFormatter('')
    ).to.equal('');

    expect(
      NumberFormatter(null)
    ).to.equal('');

    expect(
      NumberFormatter(0)
    ).to.equal('0');

    expect(
      NumberFormatter('', { placeholder: 'NA' })
    ).to.equal('NA');

    expect(
      NumberFormatter(123456789.01234)
    ).to.equal('123456789.01');

    expect(
      NumberFormatter(123456789.01234, {})
    ).to.equal('123456789.01');

    expect(
      NumberFormatter(123456789.01234, { maxFraction: 0 })
    ).to.equal('123456789');

    expect(
      NumberFormatter(123456789.01234, { minFraction: 10, maxFraction: 10 })
    ).to.equal('123456789.0123400000');

    expect(
      NumberFormatter(123456789.01234, { group: true })
    ).to.equal('123,456,789.01');

    expect(
      NumberFormatter(123456789.01234, { percent: true } )
    ).to.equal('12345678901.23');

    expect(
      NumberFormatter(123456789.01234, { percent: 'yield' } )
    ).to.equal('12345678901.23');

    expect(
      NumberFormatter(123456789.01234, { percent: 'duration' } )
    ).to.equal('123456789.01');
  });

});
