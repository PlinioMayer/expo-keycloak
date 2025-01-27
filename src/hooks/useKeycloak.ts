import {useCallback, useContext, useMemo} from 'react';
import {KeycloakContext} from '../KeycloakContext';

import jwt_decode from '../utils/jwt-decode';
import {AccessTokenParsed, KeycloakContextValue, KeycloakHook} from "../types";

export const useKeycloak = (): KeycloakHook => {
    const {
        isLoggedIn = false,
        login,
        logout,
        refresh,
        ready = false,
        tokens,
        loadUserInfo,
    } = useContext<KeycloakContextValue>(KeycloakContext);

    const hasRealmRole = useCallback(
        (role: string): boolean => {
            if (tokens && tokens.accessToken) {
                const {realm_access: {roles = []} = {}} = jwt_decode(
                    tokens.accessToken,
                );
                return roles.includes(role);
            }
            return false;
        },
        [tokens],
    );

    const accessTokenParsed: AccessTokenParsed = useMemo(
        () => (tokens && tokens.accessToken ? jwt_decode(tokens.accessToken) : {}),
        [tokens],
    );

    return {
        isLoggedIn,
        login,
        logout,
        refresh,
        ready,
        accessToken: tokens && tokens.accessToken ? tokens.accessToken : '',
        accessTokenParsed,
        hasRealmRole,
        loadUserInfo,
    };
};
