package in.cs.main.config;

import in.cs.main.service.UserDetailsServiceImpl;
import in.cs.main.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().startsWith("/auth");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("accessToken".equals(cookie.getName())) {
                    try {
                        String token = cookie.getValue();
                        String username = jwtUtil.extractUsername(token);

                        if (SecurityContextHolder.getContext().getAuthentication() == null) {
                            UserDetails userDetails =
                                    userDetailsService.loadUserByUsername(username);

                            if (jwtUtil.validateToken(token, userDetails)) {
                                UsernamePasswordAuthenticationToken authToken =
                                        new UsernamePasswordAuthenticationToken(
                                                userDetails,
                                                null,
                                                userDetails.getAuthorities());

                                authToken.setDetails(
                                        new WebAuthenticationDetailsSource()
                                                .buildDetails(request));

                                SecurityContextHolder.getContext()
                                        .setAuthentication(authToken);
                            }
                        }
                    } catch (Exception e) {
                        // 🔥 ignore invalid / expired token
                    }
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}

//@Component
//public class JwtFilter extends  OncePerRequestFilter{
//
//
//
//        @Autowired
//        JwtUtil jwtUtil;
//
//        @Autowired
//        ApplicationContext context;
//
//        @Override
//        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//           String path=request.getServletPath();
//            if (path.startsWith("/auth")) {
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//
//            String authHeader = request.getHeader("Authorization");
//
//            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//                filterChain.doFilter(request, response);
//                return;
//            }
//
//           // String authHeader=request.getHeader("Authorization");
//            String token=null;
//            String username=null;
//            if (authHeader!=null&& authHeader.startsWith("Bearer ")){
//                token=authHeader.substring(7);
//                username=jwtUtil.extractUsername(token);
//
//            }
//            if (username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
//                UserDetails userDetails=context.getBean(UserDetailsServiceImpl.class).loadUserByUsername(username);
//
//                if (jwtUtil.validateToken(token,userDetails)){
//
//                    UsernamePasswordAuthenticationToken authtoken=
//                            new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
//
//                    authtoken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                    SecurityContextHolder.getContext().setAuthentication(authtoken);
//                }
//
//            }
//            filterChain.doFilter(request,response);
//        }
//
//    }


