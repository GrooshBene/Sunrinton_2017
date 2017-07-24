# Sunrinton_2017
2017 SIHS Hackathon

## Database Schema
-------

### User Schema

> _id : String, 페이스북 auth를 사용할 경우 페이스북 고유 식별번호로 초기화됩니다.

> name : String, 사용자의 이름입니다다

> thumbnail : String, 사용자 프로필사진의 링크입니다.

> terror_target : String, 테러를 할 대상의 id입니다.

> options : 각종 테러 옵션입니다. 아래와 같은 속성값으로 이루어집니다.

	{
    	feature_lock : 기능 잠금 여부입니다. Boolean
        vibration : 진동 기능 여부입니다. Boolean
        flash : 플래시 기능 여부입니다. Boolean
        tts : 텍스트 투 스피치 기능 여부입니다.
        아래와 같은 속성값으로 이루어집니다.
        	{ value : 기능 여부입니다. Boolean,
            text : TTS를 이용해 읽어줄 문장입니다.}
        alarm : 알람 기능 여부입니다.
    }
    
> online : Boolean, 현재 온라인 여부입니다.

### API Document

> /auth/facebook/token (GET) : Facebook Token Authentication

>> Requiring Params

	access_token : Facebook Token

>> Return Values

	>>> On Success

		HTTP Code 200, User Schema
        
    >>> On Failure

		HTTP code 404
        
> /alert/test : Test FCM Method

>> Requiring Params

	fcm_token : Device fcm token

>> Return Values

	>>> On Success

		NTH
    
    >>> On Failure

		NTH
        
> /send/mail : Mail Sending

>> Requiring Params

	email : Target email address
    
    id : email auth id
    
    password : email auth password
    
    title : email title
    
    subject : email subject
    
    content : email content
    
> /user/online : Turn User Online

>> Requiring params

	id : user id
    
>> Return Values

	>>> On Success

		HTTP Code 200, Updated Schema
        
    >>> On Failure

		HTTPO Code 404
        
        > /user/online : Turn User Online
        
> /user/online : Turn User Offline

>> Requiring params

	id : user id
    
>> Return Values

	>>> On Success

		HTTP Code 200, Updated Schema
        
    >>> On Failure

		HTTP Code 404
        
> /user/option/update : User Option Update

	>> Requiring params

	id : user id
    feature_lock : Updating feature lock value
    vibration : Updating Vibration value
    flash : Updating flash value
    tts_value : updating tts value
    tts_text : Updating tts textg
    alarm : Updating alarm value

>> Return values
>>> On Success

	HTTP Code 200, Updated Schema
    
>>> On Failure

	HTTP code 401
    
> /user/list

	>> Requiring params

	id : User's Id

    
    >> Return Values

	>>> On Success

	HTTP code 200, User Array
    
    	>>> On Failure

	HTTP code 401
