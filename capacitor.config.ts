import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'ca.technolibre.aliments',
	appName: 'aliments-angular-capacitor',
	webDir: 'dist/aliments-angular-capacitor',
	bundledWebRuntime: false,
	plugins: {
		CapacitorHttp: {
			enabled: true,
		},
	},
};

export default config;
