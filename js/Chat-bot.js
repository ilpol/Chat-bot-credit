(function () {
    let questions = ["Здравствуйте! Введите Имя, например, Иван",
                     "Введите день рождения в формате дд.мм.гггг, например, 15.05.1996",
                     "Введите Номер телефона, например, 89165555555", 
                     "Введите email, например, test@mail.ru"];
    let checks = ['Имя', 'День рождения', 'Номер телефона', 'Email'];
    let answers = [];
    let i = 0;

    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        message_side = 'left';

        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        sendMessage = function (text) {            
            var $messages, message;           
            if (text.trim() === '') {
                return;
            }

            $('.message_input').val('');    
            $messages = $('.messages');          
            message_side = message_side === 'left' ? 'right' : 'left';     
            message = new Message({
                text: text,
                message_side: message_side
            });     
            message.draw();    
            var scroll=document.getElementById("scroll");      
             scroll.scrollTop = scroll.scrollHeight;
        };

        sendMessage(questions[i]);

        $('.send_message').click(function (e) {
        	run_it();
        });

        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
            	run_it();
            }
        });

        function check(messageText, i) {
          curCheck = checks[i];

          if (curCheck === "День рождения") {
                if(!/^\d{1,2}\.\d{1,2}\.\d{4}$/.test(messageText))
                {
                    console.log("here1");
                    return false;
                  }

                // Parse the date parts to integers
                var parts = messageText.split("/");
                var day = parseInt(parts[0], 10);
                var month = parseInt(parts[1], 10);
                var year = parseInt(parts[2], 10);

                // Check the ranges of month and year
                if(year < 1000 || year > 3000 || month <1 || month > 12 || day < 1 || day > 31)
                  {console.log("here5");
                    return false;
                }
                return true;
          }

          if (curCheck === "Email") {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(messageText).toLowerCase());
          }

          return true;
        }

        function completeDialog() {
                    sendMessage("Спасибо! Ваша заявка уже обрабатывается. Ваши ответы: " + answers.join(', '));
                    console.log(answers);
        }

        function run_it(){    
              console.log("here1");       
              messageText = getMessageText();
              sendMessage(messageText); 
              if (i === questions.length) {
                   completeDialog();
              }  
              else if (check(messageText, i)) {
                answers[i] = messageText;
                i++;
                if (i === questions.length) {
                   completeDialog();
                }
                else {
                  curQuestion = questions[i];
                  sendMessage(questions[i]);
                }
              }
              else
              {
                sendMessage("Вы ввели " + checks[i] + " в неправильном формате. Введите снова.");
              }

        return 0;           
        };       
    });
}.call(this));
