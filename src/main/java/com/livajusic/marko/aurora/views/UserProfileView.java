package com.livajusic.marko.aurora.views;

import com.livajusic.marko.aurora.LanguagesController;
import com.livajusic.marko.aurora.UserInfoDisplayUtils;
import com.livajusic.marko.aurora.db_repos.GifRepo;
import com.livajusic.marko.aurora.services.*;
import com.livajusic.marko.aurora.tables.AuroraGIF;
import com.livajusic.marko.aurora.tables.ProfilePicture;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H3;
import com.vaadin.flow.component.html.Image;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.BeforeEvent;
import com.vaadin.flow.router.HasUrlParameter;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.server.auth.AnonymousAllowed;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@PageTitle("Main")
@Route(value = "/profile")
@AnonymousAllowed
public class UserProfileView extends Div implements HasUrlParameter<String> {
    private final H3 usernameText;
    private String username;
    private final UserService userService;
    private final FollowService followService;
    private final SettingsService settingsService;
    private final GifRepo gifRepo;
    private final GIFDisplayService gifDisplayService;
    private UserInfoDisplayUtils userInfoDisplayUtils;
    private final LanguagesController languagesController;
    private final ProfilePictureService profilePictureService;
    private final NotificationService notificationService;
    private final LikeService likeService;

    private com.vaadin.flow.component.textfield.TextField msgInput;
    private VerticalLayout mainLayout;
    private VerticalLayout infoLayout;
    private VerticalLayout gifsLayout;

    public UserProfileView(UserService userService,
                           FollowService followService,
                           ProfilePictureService profilePictureService,
                           LanguagesController languagesController,
                           SettingsService settingsService,
                           GifRepo gifRepo,
                           GIFDisplayService gifDisplayService,
                           NotificationService notificationService,
                           LikeService likeService) {
        this.userService = userService;
        this.settingsService = settingsService;
        this.followService = followService;
        this.gifRepo = gifRepo;
        this.gifDisplayService = gifDisplayService;
        this.languagesController = languagesController;
        this.profilePictureService = profilePictureService;
        this.notificationService = notificationService;
        this.likeService = likeService;
        usernameText = new H3();

        NavigationBar navbar = new NavigationBar(userService, profilePictureService, languagesController, settingsService, notificationService);
        add(navbar);

        mainLayout = new VerticalLayout();
        mainLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);
        mainLayout.getStyle().set("margin", "0 auto");
        mainLayout.getStyle().set("align-items", "center");
        mainLayout.setWidthFull();
        add(mainLayout);

        infoLayout = new VerticalLayout();
        infoLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);
        infoLayout.setWidth("80%");
        infoLayout.getStyle().set("align-items", "center");

        gifsLayout = new VerticalLayout();
        gifsLayout.setDefaultHorizontalComponentAlignment(FlexComponent.Alignment.CENTER);
        gifsLayout.setWidth("80%");
        gifsLayout.getStyle().set("align-items", "center");

        mainLayout.add(infoLayout);
        mainLayout.add(gifsLayout);
    }

    private Button getFollowButton(boolean imFollowingHimAlready, Long currentUserId, Long targetUserId) {
        Button button = new Button(imFollowingHimAlready ? "Unfollow" : "Follow");
        final class FollowState {
            boolean isFollowing;

            FollowState(boolean isFollowing) {
                this.isFollowing = isFollowing;
            }
        }

        FollowState followState = new FollowState(imFollowingHimAlready);
        button.addClickListener(e -> {
            if (followState.isFollowing) {
                followService.unfollowUser(currentUserId, targetUserId);
                button.setText("Follow");
            } else {
                followService.followUser(currentUserId, targetUserId);
                button.setText("Unfollow");
            }
            followState.isFollowing = !followState.isFollowing;
        });

        return button;
    }

    private Text createBio(Long userId) {
        return new Text(userService.getBio(userId));
    }

    @Override
    public void setParameter(BeforeEvent event, String parameter) {
        loadUserProfile(parameter);
    }

    private void loadUserProfile(String username) {
        this.username = username;

        infoLayout.removeAll();
        gifsLayout.removeAll();
        usernameText.setText(languagesController.get("profile_of_user") + ": " + username);
        infoLayout.add(usernameText);

        final var targetUserId = userService.getUserIdByUsername(username).get();
        Text bio = createBio(targetUserId);
        infoLayout.add(bio);

        Optional<ProfilePicture> targetUserPfpOptional = profilePictureService.getPfpByUserId(targetUserId);
        if (targetUserPfpOptional.isEmpty()) {
            Notification.show("Error!", 1000, Notification.Position.TOP_CENTER);
            return;
        } else {
            Image pfp = gifDisplayService.getImage(targetUserPfpOptional.get().getImageData());
            pfp.setWidth("100px");
            pfp.setHeight("100px");
            pfp.getStyle().set("border-radius", "50%");
            infoLayout.add(pfp);
        }

        userInfoDisplayUtils = new UserInfoDisplayUtils(gifRepo, targetUserId, userService, followService, settingsService, gifDisplayService, languagesController);
        infoLayout.add(userInfoDisplayUtils.getInfoLayout());

        if (userService.isLoggedIn()) {
            final Long userId = userService.getCurrentUserId();
            boolean imFollowingHimAlready = followService.isFollowing(userId, targetUserId);
            Button button = getFollowButton(imFollowingHimAlready, userId, targetUserId);

            msgInput = new com.vaadin.flow.component.textfield.TextField(languagesController.get("message"));
            Button msgUserBtn = getMessageBtn();
            HorizontalLayout messageLayout = new HorizontalLayout();
            messageLayout.setAlignItems(FlexComponent.Alignment.BASELINE);
            messageLayout.add(msgInput, msgUserBtn);

            infoLayout.add(button, messageLayout);
        }

        Tab usersPostsTab = new Tab(String.format("%s's %s", username, languagesController.get("posts")));
        Tab likedPostsTab = new Tab(languagesController.get("liked"));

        Tabs tabs;
        if (settingsService.canOthersSeeWhatILiked(targetUserId)) {
            tabs = new Tabs(usersPostsTab, likedPostsTab);
        } else {
            tabs = new Tabs(usersPostsTab);
        }

        tabs.setSelectedTab(usersPostsTab);
        tabs.setWidthFull();
        infoLayout.add(tabs);

        tabs.addSelectedChangeListener(event -> {
            gifsLayout.removeAll();

            Tab selectedTab = event.getSelectedTab();
            if (selectedTab.equals(usersPostsTab)) {
                displayGifs(targetUserId, gifsLayout);
            } else if (selectedTab.equals(likedPostsTab)) {
                // TODO: profile picture of gif poster, not users profile.
                displayLikedGifs(targetUserId, gifsLayout);
            }
        });

        displayGifs(targetUserId, gifsLayout);
    }

    private void displayLikedGifs(Long targetUserId, VerticalLayout gifsLayout) {
        System.out.println("displayLikedGifs");
        final List<AuroraGIF> gifs = likeService.getPostsUserLiked(targetUserId);
        if (gifs != null && !gifs.isEmpty()) {
            for (AuroraGIF gif : gifs) {
                final var user = gif.getUser();
                final var opUsername = user.getUsername();
                final var opId = user.getId();
                final var opPfp = profilePictureService.getPfpByUserId(opId).get().getImageData();
                Div gifDiv = gifDisplayService.displaySingleGif(opUsername, gif, opPfp);
                gifsLayout.add(gifDiv);
            }
        }
    }

    private void displayGifs(Long targetUserId, VerticalLayout gifsLayout) {
        final List<Object[]> gifsObjs = userService.findAllByUserIdAndPfp(targetUserId);
        for (Object[] gifObj : gifsObjs) {
            final AuroraGIF gif = (AuroraGIF) gifObj[0];
            final byte[] pfpBytes = (byte[]) gifObj[1];
            Div gifDiv = gifDisplayService.displaySingleGif(username, gif, pfpBytes);
            gifsLayout.add(gifDiv);
        }
    }

    private Button getMessageBtn() {
        Button btn = new Button(languagesController.get("message"));
        btn.addClickListener(l -> {
            final var oCurrentUser = userService.getCurrentUser();
            final var oIntendedUser = userService.getUserByUsername(username);

            if (oCurrentUser.isEmpty() || oIntendedUser.isEmpty()) {
                final var n = Notification.show(languagesController.get("couldnt_find_user"), 1000, Notification.Position.TOP_CENTER);
                n.addThemeVariants(NotificationVariant.LUMO_ERROR);
                return;
            }

            final var currentUser = oCurrentUser.get();
            final var intendedUser = oIntendedUser.get();

            String msg = String.format("%s %s: %s", currentUser.getUsername(), languagesController.get("says"), msgInput.getValue());
            notificationService.save(intendedUser, msg);
            final var n = Notification.show(languagesController.get("sent"), 1000, Notification.Position.TOP_CENTER);
            n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
        });
        return btn;
    }
}
