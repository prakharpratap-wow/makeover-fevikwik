import { createContext, useContext, useState, type ReactNode, type FC } from 'react';

interface UserData {
    name: string;
    phone: string;
    email: string;
}

interface MakeoverContextType {
    capturedImage: string | null;
    setCapturedImage: (image: string | null) => void;
    selectedTheme: string | null;
    setSelectedTheme: (theme: string | null) => void;
    resultImage: string | null;
    setResultImage: (image: string | null) => void;
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
    mirrorText: string | null;
    setMirrorText: (text: string | null) => void;
    resetState: () => void;
}

const MakeoverContext = createContext<MakeoverContextType | undefined>(undefined);

export const MakeoverProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [mirrorText, setMirrorText] = useState<string | null>(null);

    const resetState = () => {
        setCapturedImage(null);
        setSelectedTheme(null);
        setResultImage(null);
        setUserData(null);
        setMirrorText(null);
    };

    return (
        <MakeoverContext.Provider value={{
            capturedImage,
            setCapturedImage,
            selectedTheme,
            setSelectedTheme,
            resultImage,
            setResultImage,
            userData,
            setUserData,
            mirrorText,
            setMirrorText,
            resetState
        }}>
            {children}
        </MakeoverContext.Provider>
    );
};

export const useMakeover = () => {
    const context = useContext(MakeoverContext);
    if (context === undefined) {
        throw new Error('useMakeover must be used within a MakeoverProvider');
    }
    return context;
};
