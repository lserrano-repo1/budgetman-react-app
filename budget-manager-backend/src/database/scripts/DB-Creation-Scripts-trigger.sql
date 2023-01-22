CREATE OR REPLACE TRIGGER upd_acc_income_balance_trg
AFTER INSERT OR UPDATE ON BUDGETMAN.TRANSACTION  
FOR EACH ROW 

BEGIN 
	
	dbms_output.put_line('STARTING trigger upd_acc_income_balance_trg');
	dbms_output.put_line('NEW.ACC_ID:'  	|| :NEW.ACC_ID);
	dbms_output.put_line('NEW.TRN_AMOUNT ='	|| :NEW.TRN_AMOUNT);

	BEGIN
		IF(:NEW.TYP_ID=1) THEN
			/*Incomes*/
			UPDATE BUDGETMAN.ACCOUNT acc
				SET acc.ACC_BALANCE= (acc.ACC_BALANCE + :NEW.TRN_AMOUNT)
					, acc.ACC_LAST_UPDATED = SYSDATE 
			WHERE acc.ACC_ID =:NEW.ACC_ID; 
			
		ELSIF (:NEW.TYP_ID=2) THEN
			/*Expenses*/
			UPDATE BUDGETMAN.ACCOUNT acc
				SET acc.ACC_BALANCE= (acc.ACC_BALANCE - :NEW.TRN_AMOUNT)
					, acc.ACC_LAST_UPDATED = SYSDATE 
			WHERE acc.ACC_ID =:NEW.ACC_ID; 
		
		END IF;
		
	/*EXCEPTION 
		WHEN NO_DATA_FOUND THEN*/
	
		
	END;
	
	dbms_output.put_line('ENDING trigger upd_acc_income_balance_trg');	

	
	
END upd_acc_income_balance_trg;
\
