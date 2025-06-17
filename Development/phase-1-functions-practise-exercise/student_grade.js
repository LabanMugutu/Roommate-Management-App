function gradeStudent(score){
    if (score>= 80){
        return "Excellent"
    }
    else if (score >=50 && score <=79){
        return "Good"
    }
    else {
        return "Fail"
    }
}