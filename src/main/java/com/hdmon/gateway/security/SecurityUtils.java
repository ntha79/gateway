package com.hdmon.gateway.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
//import com.hdmon.gateway.security.oauth2.CustomUserDetails;

import java.util.Optional;

/**
 * Utility class for Spring Security.
 */
public final class SecurityUtils {
    private static final Logger log = LoggerFactory.getLogger(SecurityUtils.class);

    private SecurityUtils() {
    }

    /**
     * Get the login of the current user.
     *
     * @return the login of the current user
     */
    public static Optional<String> getCurrentUserLogin() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> {
                if (authentication.getPrincipal() instanceof UserDetails) {
                    UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
                    return springSecurityUser.getUsername();
                } else if (authentication.getPrincipal() instanceof String) {
                    return (String) authentication.getPrincipal();
                }
                return null;
            });
    }

//    /**
//     * Get the login of the current user.
//     *
//     * @return the login of the current user
//     */
//    public static Optional<Long> getCurrentUserLoginId() {
//        SecurityContext securityContext = SecurityContextHolder.getContext();
//        return Optional.ofNullable(securityContext.getAuthentication())
//            .map(authentication -> {
//                log.info("getCurrentUserLoginId Details={}, 2={}, 3={}", authentication.getDetails(), authentication.getPrincipal(), authentication.getAuthorities());
//                    if (authentication.getPrincipal() instanceof UserDetails) {
//                        CustomUserDetails springSecurityUser = (CustomUserDetails) authentication.getPrincipal();
//                        return springSecurityUser.getUserID();
//                    }
//                else if (authentication.getPrincipal() instanceof CustomUserDetails) {
//                    CustomUserDetails springSecurityUser = (CustomUserDetails) authentication.getPrincipal();
//                    return springSecurityUser.getUserID();
//                } else if (authentication.getPrincipal() instanceof Long) {
//                    return (Long) authentication.getPrincipal();
//                }
//                return -1L;
//            });
//    }

    /**
     * Check if a user is authenticated.
     *
     * @return true if the user is authenticated, false otherwise
     */
    public static boolean isAuthenticated() {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(AuthoritiesConstants.ANONYMOUS)))
            .orElse(false);
    }

    /**
     * If the current user has a specific authority (security role).
     * <p>
     * The name of this method comes from the isUserInRole() method in the Servlet API
     *
     * @param authority the authority to check
     * @return true if the current user has the authority, false otherwise
     */
    public static boolean isCurrentUserInRole(String authority) {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
            .map(authentication -> authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(authority)))
            .orElse(false);
    }
}
