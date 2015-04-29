/**
 * Application configuration added to angular via a dynamic constant at boot time
 * @see App::bootstrapApp()
 */
interface IBootConfig {
    debugInfoEnabled?: boolean;
    html5Mode?: boolean;
    apiBaseUrl?: string;
}

export = IBootConfig;
