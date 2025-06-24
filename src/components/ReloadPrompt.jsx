// src/components/ReloadPrompt.jsx
import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log('Service Worker registrado:', r);
        },
        onRegisterError(error) {
            console.log('Erro no registro do Service Worker:', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (offlineReady || needRefresh) {
        return (
            <div className="fixed right-0 bottom-0 m-4 p-4 border rounded-lg shadow-lg bg-gray-800 border-gray-600 text-white z-50">
                <div className="mb-2">
                    {offlineReady ? (
                        <span>Aplicativo pronto para funcionar offline.</span>
                    ) : (
                        <span>Nova versão disponível, clique para atualizar.</span>
                    )}
                </div>
                {needRefresh && (
                    <button
                        className="px-4 py-2 bg-yellow-500 text-gray-900 font-bold rounded-md hover:bg-yellow-400"
                        onClick={() => updateServiceWorker(true)}
                    >
                        Atualizar
                    </button>
                )}
                <button className="px-4 py-2 ml-2" onClick={() => close()}>
                    Fechar
                </button>
            </div>
        );
    }

    return null;
}

export default ReloadPrompt;