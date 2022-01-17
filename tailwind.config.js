module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        100: '25rem',
        104: '26rem',
        108: '27rem',
        112: '28rem',
        116: '29rem',
        120: '30rem',
        124: '31rem',
        128: '32rem',
        132: '33rem',
        136: '34rem',
        140: '35rem',
        144: '36rem',
        148: '37rem',
        152: '38rem',
        156: '39rem',
        160: '40rem',
        164: '41rem',
        168: '42rem',
        172: '43rem',
        176: '44rem',
        180: '45rem',
      },
      scale: {
        101: '1.01',
        102: '1.02',
        103: '1.03',
        104: '1.04',
      },
      colors: {
        'fashop-primary': '#f6f9fb',
        'fashop-1': '#6c5485',
        'fashop-2': '#896c94',
        'fashop-3': '#a684a3',
        'fashop-4': '#c49db3',
        'fashop-5': '#c49db3',
      },
      transitionProperty: {
        width: 'width',
      },
    },
  },
  variants: {
    extend: {
      scale: ['group-hover'],
      borderRadius: ['group-hover'],
    },
  },
  plugins: [],
}
