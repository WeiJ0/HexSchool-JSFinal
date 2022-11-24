const colorToTen = (color) => Array(10).fill(color);

const theme = {
    fontFamily: 'Noto Sans TC',
    colorScheme: 'light',
    colors: {
        'custom-primary': colorToTen('#1C284D'),
        'custom-second': colorToTen('#52C8FF'),
        'custom-third': colorToTen('#E8F7FE'),
        'custom-green': colorToTen('#6FD09D')
    },
    headings: {
        sizes: {
            h1: { fontSize: 40 },
            h2: { fontSize: 32 },
            h3: { fontSize: 28 },
            h4: { fontSize: 24 },
            h5: { fontSize: 20 },
            h6: { fontSize: 16 },
        }
    },
    components: {
        Container: {
            defaultProps: {
                sizes: {
                    xl: 1296
                }
            }
        }
    }
}

export default theme;