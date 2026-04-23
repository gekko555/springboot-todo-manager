package com.example.todomanager.repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.todomanager.entity.Todo;
import com.example.todomanager.enums.TodoPriority;
import com.example.todomanager.enums.TodoStatus;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>{

    //全てのtodoを取得
    @Query("SELECT t FROM Todo t")
    List<Todo> findAllTodos();

    //タイトルを曖昧検索
    @Query("SELECT t FROM Todo t WHERE t.title LIKE CONCAT('%', :keyword, '%')")
    List<Todo> findByTitleKeyword(@Param("keyword") String keyword);

    //説明を曖昧検索
    @Query("SELECT t FROM Todo t WHERE t.description LIKE CONCAT('%', :keyword, '%')")
    List<Todo> findByDescriptionKeyword(@Param("keyword") String keyword);
    
    //ステータス一致
    @Query("SELECT t FROM Todo t WHERE t.status= :status")
    List<Todo> findByStatus(@Param("status") TodoStatus status);
    
    //優先度一覧
    @Query("SELECT t FROM Todo t WHERE t.priority = :priority")
    List<Todo> findByPriority(@Param("priority") TodoPriority priority);

    //機嫌がある日以降
    @Query("SELECT t FROM Todo t WHERE t.dueDate >= :dueDate")
    List<Todo> findByDueDateAfter(@Param("dueDate") LocalDate dueDate);

    //7機嫌がある日以前
    @Query("SELECT t FROM Todo t WHERE t.dueDate <= :dueDate")
    List<Todo> findByDueDateBefore(@Param("dueDate") LocalDate dueDate);

    //8作成日がある日時以降
    @Query("SELECT t FROM Todo t WHERE t.createdAt >= :createdAt")
    List<Todo> findByCreatedAtAfter(@Param("createdAt") LocalDateTime createdAt);

    //9.更新日がある日以前
    @Query("SELECT t FROM Todo t WHERE t.updatedAt <= :updatedAt")
    List<Todo> findByUpdatedAtBefore(@Param("updatedAt") LocalDateTime updatedAt);

    //10.機嫌がNULLではないもの
    @Query("SELECT t FROM Todo t WHERE t.dueDate is NOT NULL")
    List<Todo> findByDueDateNotNull();

    //11.機嫌がNULLのもの
    @Query("SELECT t FROM Todo t WHERE t.dueDate is NULL")
    List<Todo> findByDueDateIsNull();

    //12.作成日が新しい順
    @Query("SELECT t FROM Todo t ORDER BY t.createdAt DESC")
    List<Todo> findAllORderByCreatedAtDesc();

    //13.作成日が古い順
    @Query("SELECT t FROM Todo t OREDR BY t.createdAt ASC")
    List<Todo> findAllORderByCreatedAtAsc();

    //14.期限が早い順
    @Query("SELECT t FROM Todo t OREDR BY t.dueDate ASC")
    List<Todo> findAllOrderByDueDateAsc();

    //15.期限が遅い順
    @Query("SELECT t FROM Todo t ORDER BY t.dueDate DESC")
    List<Todo> findAllOrderByDueDateDesc();

    //16.優先順
    @Query("SELECT t FROM Todo t ORDER BY t.priority DESC")
    List<Todo> findAllOrderByPriorityDesc();

    //17.タイトル部分一致＋ステータス（修正）
    @Query("""
        SELECT t FROM Todo t 
        WHERE t.title LIKE CONCAT('%', :keyword, '%')
            AND t.status = :status
        """)
        List<Todo> findByTitleContainingAndStatus(
            @Param("keyword") String keyword,
            @Param("status") TodoStatus status);

    //18.ステータス＋優先度
    @Query("""
            SELECT t FROM Todo t
            WHERE t.status = :status
             AND t.priority = :priority
    """)
    List<Todo> findByStatusAndPriorityList(
        @Param("statsu") TodoStatus status,
        @Param("priority") TodoPriority priority
    );

    //動的検索
    @Query("""
            SELECT t FROM Todo t
            WHERE (:keyword IS NULL OR t.title LIKE CONCAT('%', :keyword, '%'))
            AND (:status IS NULL OR t.status = :status)
            AND (:priority IS NULL OR t.priority = :priority)
            AND (:dueDateFrom IS NULL OR t.dueDate >= :dueDateFrom)
            AND (:dueDateTo IS NULL OR t.dueDate <= :dueDateTo)
            """)
            List<Todo> searchTodos(
                @Param("keyword") String keyword,
                @Param("status") TodoStatus status,
                @Param("priority") TodoPriority priority,
                @Param("dueDateFrom") LocalDate dueDateForm,
                @Param("dueDateTo") LocalDate dueDateTo
            );
}
