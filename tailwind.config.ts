import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },

        // Custom colors
        // light theme
        primaryLight: '#000000', // primary color
        onPrimaryLight: '#E7E7E7', // color for items over primary color

        primaryVariantLight: '#C7C7C7',

        secondaryLight: '#0E5FFF',
        onSecondaryLight: '#BFBFC0',

        secondaryVariantLight: '#B8B8B8',

        surfaceLight: '#FFFFFF', // background colors of components like card, buttons, etc.
        onSurfaceLight: '#000000', // text and icon colors of components like card, buttons, etc.

        backgroundLight: '#F2F2F2', // page bg color
        onBackgroundLight: '#000000', // items color over bg

        errorLight: '#FFFFFF',
        onErrorLight: '#F52D2D',

        textPrimaryLight: '#000000',
        textSecondaryLight: '#3E3F43',
        textTertiaryLight: '#667781',
        textQuaternaryLight: '#808080',

        sidebarBgLight: '#0F1621',

        inputBorderLight: '#0000001A',
        horizontalLineLight: '#f0f0f0', // used in table border and <hr>

        whiteButtonBgLight: '#FFFF',
        whiteButtonHoverBgLight: '#ffffff7e',
        whiteButtonActiveBgLight: '#ffffffba',

        grayButtonBgLight: '#e5e7eb',
        grayButtonHoverBgLight: '#e2e8f0',
        grayButtonActiveBgLight: '#d1d5db',

        tableHeaderBgLight: '#F4F4F4',
        tableOddColorLight: '#fbfbfb',
        tableCellBorderLight: '#9A9A9A',

        switchBgLight: '#C7C7C7',

        onHoverBgLight: '#F4F4F4',
        onActiveBgLight: '#e2e8f0',

        imgPickerBorderLight: '#808080',
        imgPickerBgLight: '#808080',

        chequeBottomBgLight: '#f8fcff',
        chequeOptionalTextLight: '#b6b7c9',

        shimmerColorLight: '#e3e3e3',
        popupMenuSearchBarBgLight: '#F4F4F4',

        // dark theme
        primaryDark: '#000000', // primary color
        onPrimaryDark: '#FFFFFF', // not set    // color for items over primary color //not set

        primaryVariantDark: '#3A3B3C',

        secondaryDark: '#0E5FFF',
        onSecondaryDark: '#BFBFC0',

        secondaryVariantDark: '#FFFFFF',

        surfaceDark: '#242526', // background colors of components like card, buttons, etc.
        onSurfaceDark: '#E3E6EA', // text and icon colors of components like card, buttons, etc.

        backgroundDark: '#18191A', // page bg color
        onBackgroundDark: '#D3D3D3', // items color over bg

        errorDark: '#FFFFFF', // not set
        onErrorDark: '#F52D2D', // not set

        textPrimaryDark: '#e9edef', // done
        textSecondaryDark: '#d1d7db', // done
        textTertiaryDark: '#8696a0', // done
        textQuaternaryDark: '#808080',

        sidebarBgDark: '#242526',

        inputBorderDark: '#4b5563',
        horizontalLineDark: '#F5F5F51A', // used in table border and <hr>

        whiteButtonBgDark: '#FFFF',
        whiteButtonHoverBgDark: '#ffffffea',
        whiteButtonActiveBgDark: '#fffffff6',

        grayButtonBgDark: '#3A3B3C',
        grayButtonHoverBgDark: '#4b5563',
        grayButtonActiveBgDark: '#374151',

        tableHeaderBgDark: '#3A3B3C',
        tableOddColorDark: '#18191A',
        tableCellBorderDark: '#F5F5F540',

        switchBgDark: '#505050',

        onHoverBgDark: '#18191A',
        onActiveBgDark: '#0f172a',

        imgPickerBorderDark: '#E3E6EA',
        imgPickerBgDark: '#A9ACB1',

        chequeBottomBgDark: '#3A3B3C',
        chequeOptionalTextDark: '#b6b7c9',

        shimmerColorDark: '#1c1e1f',
        popupMenuSearchBarBgDark: '#18191a5b',

        saleBottomCardBgDark: '#18191a5d',

        // below are fixed colors
        sidebarBorder: '#ffffff4d',

        buttonBorder: '#DCDCDC',

        greenButtonHoverBg: '#16a34a',
        greenButtonActiveBg: '#15803d',
        blueButtonHoverBg: '#2563eb',
        blueButtonActiveBg: '#1d4ed8',

        blackButtonHoverBg: '#000000bb',
        blackButtonActiveBg: '#000000d9',

        inputErrorBorder: '#FF6C6C',

        textPrimaryRed: '#FF6C6C', // Todo
        textSecondaryRed: '#FF6C00',
        textTertiaryRed: '#A30D11',
        textPrimaryGreen: '#23CFAB', // Todo
        textPrimaryBlue: '#6366f1',
        textSecondaryBlue: '#0E5FFF',
        textPrimaryOrange: '#f97316',
        textSecondaryOrange: '#fdba74',
        textPrimaryViolet: '#6200EE',
        textPrimaryYellow: '#ffea2a',

        bgPrimaryRed: '#FF3522',

        saleTablePrimaryBg: '#94B8FF',
        saleTableSecondaryBg: '#0E5FFF1F',

        unPaidBgColor: '#E52C43',

        greenBg: '#e1f6ef',
        yellowBg: '#facc15',
        tagGreenBg: '#23B89A33',
        tagRedBg: '#E52C4333',
        tagOrangeBg: '#ffedd5',

        dialogCardBg: '#f4f4f4',
        saleTextAreaBg: '#fbfafa',

        switchPrimaryBlueBg: '#2563eb',
        switchSecondaryBlueBg: '#60a5fa',

        settingSidebarMenuBg: '#00000027',
        sidebarMenuBg: '#29303C',
        sidebarMenuSubItemBg: '#29303c8c',
        sidebarMenuSubItemActiveBg: '#464665a2',
        sidebarMenuHoverBg: '#ffffff18',

        profileViewCardHoverBg: '#0000002e',
        profileViewCardBorder: '#dddddd',

        cardBorder: '#b8b8b8',
        sidebarMenuItemBorder: '#1f2937',

        toggleGreenBg: '#16b31a',
        toggleRedBg: '#e50c21',

        dropDownHeaderBg: '#f7b928',
        discountPercentBg: '#EF9904',

        bankAccGreenBorder: '#23CFAB',
        bankAccGreenBg: '#23b89921',
        bankAccRedBorder: '#EF4760',
        bankAccRedBg: '#ef476025',

        shareLinkText: '#F64222',
        onlineStoreRedBg: '#F3A6A6',

        profileSignatureMenuBg: '#ECECED',

        bottomToolbarBtnHoverBg: '#ffffff24',
        bottomToolbarBtnActiveBg: '#ffffff37',
        bottomToolbarBorder: '#00000025',
        searchableInputBlueColor: '#228be6',

        reportsSideBarBg: '#f9fafb',
        primaryGreen: '#22c55e',

        crownGold: '#FFD700',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
