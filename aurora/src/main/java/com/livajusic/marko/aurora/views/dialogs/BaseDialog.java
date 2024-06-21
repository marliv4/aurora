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
package com.livajusic.marko.aurora.views.dialogs;

import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.H2;
import org.springframework.stereotype.Component;

@Component
public class BaseDialog {
    protected Dialog dialog;
    protected H2 title;

    public BaseDialog() {
        this.dialog = new Dialog();
        this.title = new H2();
        addComponentToDialog(title);
        dialog.setWidth("400px");
        dialog.setCloseOnEsc(true);
        dialog.setCloseOnOutsideClick(true);
    }
    public void open() {
        dialog.open();
    }

    public void setWidth(String width) {
        dialog.setWidth(width);
    }

    public void addComponentToDialog(com.vaadin.flow.component.Component component) {
        dialog.add(component);
    }

    public void open(Long gifId) {
        dialog.open();
    }

    public void close() {
        dialog.close();
    }

}
