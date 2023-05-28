package com.tdlist.todolist.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NaverUserInfoDto {
    private String naverId;
    private String naverName;
    private String naverEmail;

    @Builder
    public NaverUserInfoDto(String naverId, String naverName, String naverEmail) {
        this.naverId = naverId;
        this.naverName = naverName;
        this.naverEmail = naverEmail;
    }
}
