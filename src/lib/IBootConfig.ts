/**
 * Application configuration added to angular via a dynamic constant at boot time
 * @see App::bootstrapApp()
 */
interface IBootConfig {
    isDebugInfoEnabled?: boolean;
    isHtml5ModeEnabled?: boolean;
    isStubsEnabled?: boolean;
    apiBaseUrl?: string;
}

export = IBootConfig;
