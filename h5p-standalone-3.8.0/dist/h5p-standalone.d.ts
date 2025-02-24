import { H5PContent, H5PIntegration, H5PPackageDefinition, LibraryDependency, H5PLibraryDefinition, User } from "./h5p";
interface Options {
    id?: string;
    title?: string;
    frameCss: string;
    frameJs: string;
    h5pJsonPath?: string;
    librariesPath?: string;
    contentJsonPath?: string;
    frame?: boolean;
    copyright?: boolean;
    export?: boolean;
    icon?: boolean;
    fullScreen?: boolean;
    embed?: boolean;
    copy?: boolean;
    embedCode?: string;
    resizeCode?: string;
    downloadUrl?: string;
    customCss?: string[];
    customJs?: string[];
    xAPIObjectIRI?: string;
    preventH5PInit?: boolean;
    embedType?: 'div' | 'iframe';
    contentUserData?: H5PContent['contentUserData'];
    saveFreq?: number | false;
    postUserStatistics?: boolean;
    reportingIsEnabled?: boolean;
    ajax?: {
        setFinishedUrl?: string;
        contentUserDataUrl?: string;
    };
    user?: User;
    metadata?: H5PContent['metadata'];
    translations?: H5PIntegration['l10n'];
    assetsRequestFetchOptions?: RequestInit;
}
interface H5PKeyPaths {
    h5pJsonPath: string;
    contentJsonPath: string;
    librariesPath: string;
}
interface LocalLibraryDependency {
    libraryFolderName: string;
    dependencies: string[];
    preloadedCss?: H5PLibraryDefinition['preloadedCss'];
    preloadedJs?: H5PLibraryDefinition['preloadedJs'];
}
interface PlayerFrameOptions {
    anchorElement: HTMLElement;
    contentId: string;
    embedType: Options['embedType'];
    H5PIntegration: H5PIntegration;
}
export declare class H5PStandalone {
    libraryFolderContainsVersion: boolean;
    constructor(anchorElement: HTMLElement, options: Options);
    renderPlayerFrame(params: PlayerFrameOptions): Promise<void>;
    prepareH5PEnvironment(contentId: any, options: Options): Promise<H5PIntegration>;
    getH5PPaths(options: Options): H5PKeyPaths;
    libraryFolderNameIncludesVersion(librariesPath: string, dependency: LibraryDependency, assetsRequestFetchOptions?: RequestInit): Promise<boolean>;
    libraryToFolderName(library: LibraryDependency): string;
    findMainLibrary(h5pJsonContent: H5PPackageDefinition, librariesPath: string, assetsRequestFetchOptions?: RequestInit): Promise<H5PLibraryDefinition>;
    findAllDependencies(h5pJsonContent: H5PPackageDefinition, librariesPath: any, assetsRequestFetchOptions?: RequestInit): Promise<LocalLibraryDependency[]>;
    loadDependencies(toFind: string[], alreadyFound: LocalLibraryDependency[], librariesPath: string, assetsRequestFetchOptions?: RequestInit): Promise<LocalLibraryDependency[]>;
    findLibraryDependencies(libraryFolderName: string, librariesPath: string, assetsRequestFetchOptions?: RequestInit): Promise<LocalLibraryDependency>;
    sortDependencies(dependencies: LocalLibraryDependency[], librariesPath: string): {
        styles: string[];
        scripts: string[];
    };
}
export {};
