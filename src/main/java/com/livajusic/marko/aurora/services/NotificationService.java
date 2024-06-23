/*
 * This file is part of Aurora.
 *
 * Aurora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Aurora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Aurora. If not, see <https://www.gnu.org/licenses/>.
 *
 * Author: Marko Livajusic
 * Email: marko.livajusic4 <at> gmail.com
 * Copyright: (C) 2024 Marko Livajusic
 */
package com.livajusic.marko.aurora.services;


import com.livajusic.marko.aurora.db_repos.NotificationRepo;
import com.livajusic.marko.aurora.tables.AuroraUser;
import com.livajusic.marko.aurora.tables.NotificationModel;
import com.livajusic.marko.aurora.views.UploadView;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {
    private final NotificationRepo notificationRepo;
    private final EntityManager entityManager;

    public NotificationService(NotificationRepo notificationRepo,
                               EntityManager entityManager) {
        this.notificationRepo = notificationRepo;
        this.entityManager = entityManager;
    }

    public List<NotificationModel> getNotificationsForUser(Long userId) {
        Query query = entityManager.createQuery("SELECT n FROM NotificationModel n WHERE intendedUser.userId = :userId");
        query.setParameter("userId", userId);

        return (List<NotificationModel>)query.getResultList();
    }

    public void save(AuroraUser uploader, AuroraUser intendedUser) {
        final var date = UploadView.AuroraDateManager.getSqlDate(UploadView.AuroraDateManager.getUtilDate());
        final var dateStr = UploadView.AuroraDateManager.getFormattedDate(date);
        String msg = String.format("%s has uploaded a new GIF on %s", uploader.getUsername(), dateStr);
        NotificationModel notificationModel = new NotificationModel(intendedUser, msg, date);
        notificationRepo.save(notificationModel);
    }

    @Transactional
    public void delete(Long notificationId) {
        Query query = entityManager.createQuery("DELETE FROM NotificationModel n WHERE n.id = :notificationId");
        query.setParameter("notificationId", notificationId);
        query.executeUpdate();
    }

    public Long countNotificationIntendedForUser(Long intendedUserId) {
        Query query = entityManager.createQuery("SELECT count(*) FROM NotificationModel n WHERE n.intendedUser.id = :intendedUserId");
        query.setParameter("intendedUserId", intendedUserId);
        return (Long)query.getSingleResult();
    }

}
